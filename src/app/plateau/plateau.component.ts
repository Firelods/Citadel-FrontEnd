import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Player } from '../player';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextureLoader, SpriteMaterial, Sprite } from 'three';

@Component({
  selector: 'app-plateau',
  standalone: true,
  imports: [],
  templateUrl: './plateau.component.html',
  styleUrl: './plateau.component.scss',
})
export class PlateauComponent implements AfterViewInit {
  @ViewChild('container') private containerRef!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private cube!: THREE.Mesh;
  private controls!: OrbitControls;
  private textureLoader = new THREE.TextureLoader();
  players: Player[];
  constructor() {
    this.players = [
      {
        id: 'player1',
        name: 'Joueur 1',
        citadel: [
          { cost: 1 },
          { cost: 2 },
          { cost: 3 },
          { cost: 4 },
          { cost: 5 },
          { cost: 6 },
          { cost: 7 },
          { cost: 8 },
        ],
      },
      {
        id: 'player2',
        name: 'Joueur 2',
        citadel: [
          { cost: 1 },
          { cost: 2 },
          { cost: 3 },
          { cost: 4 },
          { cost: 5 },
          { cost: 6 },
        ],
      },
      {
        id: 'player2',
        name: 'Joueur 2',
        citadel: [
          { cost: 1 },
          { cost: 2 },
          { cost: 3 },
          { cost: 4 },
          { cost: 5 },
          { cost: 6 },
        ],
      },
      {
        id: 'player2',
        name: 'Joueur 2',
        citadel: [
          { cost: 1 },
          { cost: 2 },
          { cost: 3 },
          { cost: 4 },
          { cost: 5 },
          { cost: 6 },
        ],
      },
      {
        id: 'player2',
        name: 'Joueur 2',
        citadel: [{ cost: 1 }, { cost: 2 }, { cost: 3 }],
      },
      { id: 'player2', name: 'Joueur 2', citadel: [{ cost: 1 }] },
      // Ajoutez d'autres joueurs selon le besoin
    ];
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initTHREE();
    this.createDistricts();
    this.animate();
    this.createQuestionMarks();
  }

  initTHREE(): void {
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.x = 0; // Ajuster selon le besoin
    this.camera.position.y = 10; // Monter la caméra pour qu'elle puisse voir le sol
    this.camera.position.z = 5;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0)); // Orienter la caméra vers le centre de la scène
    // Initialiser OrbitControls

    // Renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
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
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Configurer les contrôles (optionnel)
    this.controls.minDistance = 5;
    this.controls.maxDistance = 20;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
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
      for (let i = 0; i < player.citadel.length; i++) {
        // Choix aléatoire de la géométrie
        const sizeMultiplierByCost = (player.citadel[i].cost * 3) / 8; // Pour que les formes les plus chères soient plus grosses
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
        playerGroup.add(district);
      }

      // Positionner le groupe de chaque joueur
      const groupAngle = (playerIndex / this.players.length) * Math.PI * 2;
      const groupRadius = 7; // Rayon pour la disposition des groupes de joueurs
      playerGroup.position.x = Math.cos(groupAngle) * groupRadius;
      playerGroup.position.z = Math.sin(groupAngle) * groupRadius;

      this.scene.add(playerGroup);
    });
  }

  createQuestionMarks(): void {
    const questionTexture = this.textureLoader.load(
      '../../assets/interrog.png'
    ); // Remplacez par le chemin de votre texture
    console.log(questionTexture);

    this.players.forEach((player, playerIndex) => {
      const material = new SpriteMaterial({ map: questionTexture });
      const questionSprite = new Sprite(material);

      // Positionner le texte au-dessus du groupe de carrés
      const groupAngle = (playerIndex / this.players.length) * Math.PI * 2;
      const groupRadius = 7;
      questionSprite.position.x = Math.cos(groupAngle) * groupRadius;
      questionSprite.position.z = Math.sin(groupAngle) * groupRadius;
      questionSprite.position.y = 2; // Ajuster la hauteur
      questionSprite.scale.set(2, 2, 2); // Ajuster la taille selon les besoins

      this.scene.add(questionSprite);
    });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
}
