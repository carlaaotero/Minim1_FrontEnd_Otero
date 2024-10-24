import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { PostService } from '../../services/post/post.service';
import { Post } from '../../models/post.model';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {

  posts: Post[] = []; // Lista de posts
  errorMessage: string = ''; // Variable para mostrar mensajes de error

  // Inicializamos un nuevo post con campos vacíos
  nuevoPost: Post = { 
    author: '', // El campo author será el nombre de usuario ingresado
    postType: '',
    content: '',
    image: '',
    postDate: new Date()
  };
  
  isEditing: boolean = false;
  editIndex: number = -1;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getPosts(); // Carga los posts al inicializar el componente
  }

  // Obtener los posts existentes
  getPosts() {
    this.postService.getPosts().subscribe(
      (data: Post[]) => {
        this.posts = data.filter(exp => exp._id !== undefined);
        console.log('Posts recibidos:', data);
      },
      (error) => {
        console.error("Error al cargar los posts:", error);
      }
    );
  }

  // Método para agregar o editar un post
  addPost(postForm: any) {
    if (this.isEditing) {
      // Actualizamos el post si estamos en modo edición
      const postId = this.posts[this.editIndex]._id;
      if (postId) {
        this.postService.updatePost(postId, { ...this.nuevoPost }).subscribe((updatedPost: Post) => {
          this.posts[this.editIndex] = updatedPost;
          this.resetFormulario(postForm);
        }, (error: any) => {
          console.error("Error al actualizar el post:", error);
        });
      } else {
        console.error("El ID del post es undefined.");
      }
    } else {
      // Creamos un nuevo post
      this.postService.createPost(this.nuevoPost).subscribe((newPost: Post) => {
        this.posts.push(newPost);
        this.resetFormulario(postForm);
      }, (error: any) => {
        console.error("Error al crear el post:", error);
      });
    }
  }

  // Preparar la edición de un post
  prepararEdicion(post: Post, index: number) {
    this.nuevoPost = { ...post };
    this.isEditing = true;
    this.editIndex = index;
  }

  // Eliminar un post
  eliminarElemento(index: number) {
    const postId = this.posts[index]._id;
    if (postId) {
      this.postService.deletePost(postId).subscribe(() => {
        this.posts.splice(index, 1);
      }, (error: any) => {
        console.error("Error al eliminar el post:", error);
      });
    } else {
      console.error("El ID del post a eliminar es undefined.");
    }
  }

  // Reiniciar la edición
  resetEdicion() {
    this.isEditing = false;
    this.resetFormulario();
  }

  // Reiniciar el formulario de post
  resetFormulario(postForm?: any) {
    this.nuevoPost = { 
      author: '', // El campo author sigue siendo un string vacío
      postType: '',
      content: '',
      image: '',
      postDate: new Date()
    }; 
    if (postForm) {
      postForm.resetForm();
    }
    this.isEditing = false;
    this.editIndex = -1;
  }

  // Método auxiliar para actualizar la lista de posts (opcional)
  actualizarLista() {
    console.log('Lista actualizada:', this.posts);
  }
}
