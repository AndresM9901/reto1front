import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api/api.service';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  datos = {
    username: 'userTest',
    password: 'strongpassword12'
  }

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.login(this.datos).subscribe(response => {
      console.log(response);
      this.authService.saveToken(response.access);
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if(this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          if(this.validateJSON(jsonData)) {
            console.log(jsonData);
            this.uploadData(jsonData);
          } else {
            alert('El archivo no es valido');
          }
        } catch(error) {
          alert(`este es el error: ${error}`);
        }
      }
      reader.readAsText(this.selectedFile);
    }
  }

  validateJSON(jsonData: any): boolean {
    return jsonData.ubicaciones && jsonData.conexiones && jsonData.inicio;
  }

  uploadData(jsonData: any): void {

    // jsonData.ubicaciones.forEach((ubicacion: any) => {
    //   this.apiService.createUbicacion(ubicacion).subscribe(response => {
    //     console.log(`ubicacion creada: ${response}`);
    //     jsonData.conexiones.forEach((conexion: any) => {
    //       this.apiService.createConexion(conexion).subscribe(response => {
    //         console.log(`Conexion creada: ${response}`);
    //       });
    //     });
    //   });
    // });
    this.apiService.createUbicacion(jsonData.ubicaciones).subscribe(response => {
      console.log(response);
    });
    this.apiService.createConexion(jsonData.conexiones).subscribe(response => {
      console.log(response)
    })
  }
}
