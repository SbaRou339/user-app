import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'user-app';
  users: any[] = [];
  posts: any[] = [];
  selectedUser: any = null;

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        this.users = data;
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }

  fetchPosts(userId: number): void {
    this.selectedUser = this.users.find(user => user.id === userId);
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        this.posts = data;
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }

  goBack(): void {
    this.selectedUser = null;
    this.posts = [];
  }
}
