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
    const loader = new FontLoader();
    loader.load('../../assets/Roboto.json', (font) => {
      this.createQuestionMarks(font);
    });
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
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('../../assets/texture_sol.jpg'); // Chemin de votre texture
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(5, 5);
    // Créer un cercle pour le sol
    const circleGeometry = new THREE.CircleGeometry(5, 320); // 5 est le rayon, 32 est le nombre de segments
    const circleMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      reflectivity: 0.5,

      side: THREE.DoubleSide,
    });
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);
    circle.rotation.x = -Math.PI / 2; // Rotation pour que le cercle soit horizontal
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

    this.renderer.render(this.scene, this.camera);
  };

  createDistricts(): void {
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00]; // Couleurs pour chaque joueur
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('../../assets/texture.png'); // Chemin de votre texture

    this.players.forEach((player, playerIndex) => {
      const playerGroup = new THREE.Group();

      for (let i = 0; i < player.citadel.length; i++) {
        // Choix aléatoire de la géométrie
        const sizeMultiplierByCost = (player.citadel[i].cost * 3) / 8; // Pour que les formes les plus chères soient plus grosses
        let geometry = new THREE.BoxGeometry(
          0.5 * sizeMultiplierByCost,
          0.5 * sizeMultiplierByCost,
          0.5 * sizeMultiplierByCost
        );

        const material = new THREE.MeshBasicMaterial({
          color: colors[playerIndex % colors.length],
          map: texture,
        });

        const district = new THREE.Mesh(geometry, material);

        // Position aléatoire mais groupée
        district.position.x = (Math.random() - 0.9) * 2;
        district.position.z = (Math.random() - 0.9) * 2;
        district.position.y = geometry!.parameters.height / 2; // Pour que les formes reposent sur le sol

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

  createQuestionMarks(font: any): void {
    const textGeometry = new TextGeometry('?', {
      font: font,
      size: 1, // Taille du texte
      height: 0.2, // Épaisseur du texte
    });

    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

    this.players.forEach((player, playerIndex) => {
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);

      // Positionner le texte au-dessus du groupe de carrés
      const groupAngle = (playerIndex / this.players.length) * Math.PI * 2;
      const groupRadius = 7;
      textMesh.position.x = Math.cos(groupAngle) * groupRadius;
      textMesh.position.z = Math.sin(groupAngle) * groupRadius;
      textMesh.position.y = 2; // Ajuster la hauteur

      this.scene.add(textMesh);
    });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
}
