import { CharacterService } from './../services/character.service';
import { Character } from './../interfaces/character';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Player } from '../interfaces/player';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextureLoader, SpriteMaterial, Sprite } from 'three';
import { PlayerService } from '../services/player.service';
import { GameService } from '../services/game.service';
import { SidePanelComponent } from '../side-panel/side-panel.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plateau',
  standalone: true,
  imports: [SidePanelComponent],
  templateUrl: './plateau.component.html',
  styleUrl: './plateau.component.scss',
})
export class PlateauComponent implements AfterViewInit {
  @ViewChild('container') private containerRef!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private textureLoader = new THREE.TextureLoader();
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  players: Player[];
  targetPosition = new THREE.Vector3();
  progress = 0; // Progression de l'animation de 0 (début) à 1 (fin)

  constructor(
    private playerService: PlayerService,
    characterService: CharacterService,
    private gameService: GameService,
    private router: Router
  ) {
    this.players = playerService.getPlayersAsList();
  }

  ngOnInit(): void {
    setTimeout(() => {
      if (!this.gameService.gameAvailable()) {
        this.router.navigate(['/home']);
      }
    }, 1000);
  }

  ngAfterViewInit(): void {
    this.initTHREE();
    this.createDistricts();
    this.animate();
    this.createQuestionMarks();
    window.addEventListener('click', this.onMouseClick);
    window.addEventListener('mousemove', this.onHover);
  }

  initTHREE(): void {
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / 2 / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.x = 0; // Ajuster selon le besoin
    this.camera.position.y = 10; // Monter la caméra pour qu'elle puisse voir le sol
    this.camera.position.z = 5;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0)); // Orienter la caméra vers le centre de la scène

    // Renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth / 2, window.innerHeight);
    this.containerRef.nativeElement.appendChild(this.renderer.domElement);
    const solTexture = this.textureLoader.load('../../assets/sol.jpg');
    solTexture.wrapS = THREE.RepeatWrapping;
    solTexture.wrapT = THREE.RepeatWrapping;
    solTexture.repeat.set(150, 150);
    const planeGeometry = new THREE.PlaneGeometry(100, 100);
    const planeMaterial = new THREE.MeshBasicMaterial({
      map: solTexture,
    }); // Couleur verte pour le sol
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2; // Rotation pour que le plan soit horizontal
    plane.position.y = 0; // Positionner le sol au niveau zéro
    this.scene.add(plane);
    this.textureLoader = new THREE.TextureLoader();

    const texture = this.textureLoader.load('../../assets/texture_sol.jpg'); // Chemin de votre texture
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(5, 5);

    // Créer un cercle pour le sol
    const circleGeometry = new THREE.CircleGeometry(5, 32); // 5 est le rayon, 32 est le nombre de segments
    const circleMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      reflectivity: 0.5,

      side: THREE.DoubleSide,
    });
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);
    circle.rotation.x = -Math.PI / 2; // Rotation pour que le cercle soit horizontal
    circle.position.y = 0.1; // Positionner le cercle au niveau zéro
    this.scene.add(circle);

    this.scene.background = new THREE.Color(0xd5d5d5);
    // Initialiser OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Configurer les contrôles (optionnel)
    this.controls.minDistance = 5;
    this.controls.maxDistance = 20;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    const axesHelper = new THREE.AxesHelper(100);
    this.scene.add(axesHelper);
    // const helper = new THREE.CameraHelper(this.camera);
    // this.scene.add(helper);
    this.renderer.render(this.scene, this.camera);
  }

  animate = (): void => {
    requestAnimationFrame(this.animate);

    // Animation
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;
    this.controls.update();
    this.updateCamera();
    this.renderer.render(this.scene, this.camera);
  };
  updateCamera() {
    if (this.camera.position.y < 1) {
      // 1 est la hauteur minimale au-dessus du sol
      this.camera.position.y = 1;
    }
  }

  createDistricts(): void {
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00]; // Couleurs pour chaque joueur
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('../../assets/texture.png'); // Chemin de votre texture

    const gridSpacing = 0.5; // Espacement entre les carrés
    const gridSize = 3; // Taille de la grille (ex: 10x10)

    this.players.forEach((player, playerIndex) => {
      const playerGroup = new THREE.Group();
      const grid = new Array(gridSize)
        .fill(null)
        .map(() => new Array(gridSize).fill(false));

      // Positionner le groupe de chaque joueur
      const groupAngle = (playerIndex / this.players.length) * Math.PI * 2;
      const groupRadius = 7; // Rayon pour la disposition des groupes de joueurs
      playerGroup.position.x = Math.cos(groupAngle) * groupRadius;
      playerGroup.position.z = Math.sin(groupAngle) * groupRadius;
      let playerPosition: THREE.Vector3 = new THREE.Vector3();
      playerGroup.getWorldPosition(playerPosition);
      player.positionOnBoard = playerPosition;
      for (let i = 0; i < player.citadel.length; i++) {
        // Choix aléatoire de la géométrie
        const sizeMultiplierByCost = (player.citadel[i].district.cost * 3) / 8; // Pour que les formes les plus chères soient plus grosses
        let geometry = new THREE.BoxGeometry(
          0.2 * sizeMultiplierByCost,
          0.2 * sizeMultiplierByCost,
          0.2 * sizeMultiplierByCost
        );

        const material = new THREE.MeshBasicMaterial({
          color: colors[playerIndex % colors.length],
          map: texture,
        });

        const district = new THREE.Mesh(geometry, material);

        let placed = false;
        while (!placed) {
          const xGrid = Math.floor(Math.random() * gridSize);
          const zGrid = Math.floor(Math.random() * gridSize);

          if (!grid[xGrid][zGrid]) {
            district.position.x =
              xGrid * gridSpacing - (gridSize * gridSpacing) / 2;
            district.position.z =
              zGrid * gridSpacing - (gridSize * gridSpacing) / 2;
            district.position.y = geometry!.parameters.height / 2;

            grid[xGrid][zGrid] = true;
            placed = true;
          }
        }
        let districtPosition: THREE.Vector3 = new THREE.Vector3();
        district.getWorldPosition(districtPosition);
        player.citadel[i].district.positionOnBoard = districtPosition;
        playerGroup.add(district);
      }

      this.scene.add(playerGroup);
    });
    console.log(this.players);
  }

  createQuestionMarks(): void {
    const questionTexture = this.textureLoader.load(
      '../../assets/interrog.png'
    );
    console.log(questionTexture);

    this.players.forEach((player, playerIndex) => {
      const material = new SpriteMaterial({ map: questionTexture });
      const questionSprite = new Sprite(material);

      // Positionner le sprite au-dessus du groupe de carrés
      const groupAngle = (playerIndex / this.players.length) * Math.PI * 2;
      const groupRadius = 7;
      questionSprite.position.x = Math.cos(groupAngle) * groupRadius;
      questionSprite.position.z = Math.sin(groupAngle) * groupRadius;
      questionSprite.position.y = 2; // Ajuster la hauteur
      // questionSprite.scale.set(2, 3, 2); // Ajuster la taille selon les besoins

      this.scene.add(questionSprite);
    });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event): void {
    this.renderer.setSize(window.innerWidth / 2, window.innerHeight);
    this.camera.aspect = window.innerWidth / 2 / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  onMouseClick = (event: MouseEvent): void => {
    this.progress = 1; // stop the animation zoom
    // Calculer la position de la souris en coordonnées normalisées (-1 à +1)
    this.mouse.x = event.clientX / (window.innerWidth / 4) - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Mettre à jour le raycaster avec la position de la caméra et la position de la souris
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Calculer les objets qui intersectent le rayon lancé
    const intersects = this.raycaster.intersectObjects(this.scene.children);

    if (intersects.length > 0) {
      // L'objet cliqué est intersects[0].object
      const object = intersects[0].object;
      // Si l'objet cliqué est un village, zoomer dessus
      let villagePosition = this.isAVillage(
        object.position.x,
        object.position.z
      );
      if (villagePosition) {
        this.zoomOnVillage(villagePosition);
        this.playerService.setFocusedPlayer(villagePosition);
      }
    }
  };

  /**
   * Change the cursor when the mouse is on a village
   * @param event  the mouse event
   */
  onHover = (event: MouseEvent): void => {
    this.mouse.x = event.clientX / (window.innerWidth / 4) - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Mettre à jour le raycaster avec la position de la caméra et la position de la souris
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Calculer les objets qui intersectent le rayon lancé
    const intersects = this.raycaster.intersectObjects(this.scene.children);

    if (intersects.length > 0) {
      // L'objet cliqué est intersects[0].object
      const object = intersects[0].object;
      // Si l'objet cliqué est un village, zoomer dessus
      let villagePosition = this.isAVillage(
        object.position.x,
        object.position.z
      );
      if (villagePosition) {
        document.body.style.cursor = 'pointer';
      } else {
        document.body.style.cursor = 'default';
      }
    }
  };

  /**
   *  Zoom on a village
   * @param targetPosition the position of the village to zoom on
   */
  zoomOnVillage(targetPosition: THREE.Vector3): void {
    let cameraLookAtPosition = new THREE.Vector3();
    cameraLookAtPosition.copy(targetPosition);
    this.targetPosition.set(
      targetPosition.x,
      targetPosition.y + 3,
      targetPosition.z + 3 // To see the village from above and behind
    );

    // Reset the progress of the animation
    this.progress = 0;
    this.camera.zoom = 0;

    this.animateCamera();
    this.controls.target.set(
      targetPosition.x,
      targetPosition.y,
      targetPosition.z
    );
    this.camera.lookAt(cameraLookAtPosition);
  }
  animateCamera = (): void => {
    if (this.progress < 1) {
      this.progress += 0.001; // Ajustez cette valeur pour contrôler la vitesse de l'animation
      // Interpoler la position de la caméra
      this.camera.position.lerpVectors(
        this.camera.position,
        this.targetPosition,
        this.progress
      );
      requestAnimationFrame(this.animateCamera);
    }
  };

  /**
   * Approximate the position of the village on the board using positioOnBoard in player
   * @param x  x of the position on the board
   * @param z  z of the position on the board
   * @returns  the position of the village on the board, or undefined if there is no village at this position
   */
  isAVillage(x: number, z: number): THREE.Vector3 | undefined {
    const villageSize = 1;
    const villagePosition = this.players.find(
      (player) =>
        player.positionOnBoard &&
        player.positionOnBoard.x - villageSize / 2 < x &&
        player.positionOnBoard.x + villageSize / 2 > x &&
        player.positionOnBoard.z - villageSize / 2 < z &&
        player.positionOnBoard.z + villageSize / 2 > z
    )?.positionOnBoard;
    if (villagePosition) {
      return new THREE.Vector3(villagePosition.x, 0, villagePosition.z);
    }
    return undefined;
  }
}
