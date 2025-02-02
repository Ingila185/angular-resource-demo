import { Component, effect, resource, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor() {
    effect(() => {

      console.log("Value: ", this.myResource.value());
      console.log("Status: ", this.myResource.status());
      console.log("Error: ", this.myResource.error());
    })
  }
  title = 'resource-api-demo';

  postId = signal(1);
  userId = signal(1);

  /* todoResource = resource({
     loader: () => {
       return Promise.resolve({ id: 1, title: "Hello World", completed: false });
     },
   });
 */

  /* myResource = resource({
     loader: () => {
       return fetch(`https://jsonplaceholder.typicode.com/posts`)
         .then((res) => res.json() as Promise<any[]>);
     },
   });
 */

  /*myResource = resource({
    loader: () => {
      return fetch(`https://jsonplaceholder.typicode.com/posts?id=${this.postId()}`)
        .then((res) => res.json() as Promise<any[]>);
    },
  });
  */


/*
  myResource = resource({
    request: this.postId,
    loader: ({ request: postId }) => {
      return fetch(`https://jsonplaceholder.typicode.com/posts?id=${this.postId()}`)
        .then((res) => res.json() as Promise<any[]>);
    },
  });
*/

/*
myResource = resource({
  request: this.postId,
  loader: ({ request: postId }) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts?id=${this.postId()}`,
      {signal: abortSignal})
      .then((res) => res.json() as Promise<any[]>);
  },
});
*/

/*myResource = resource({
  request: this.postId,
  loader: ({ request: postId }) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts?id=${this.postId()}&userId=${this.userId()}`)
      .then((res) => res.json() as Promise<any[]>);
  },
});*/

    myResource = resource({
    request: () => ({ postId: this.postId(), userId: this.userId() }),
    loader: ({ request, abortSignal }) => {
      const { postId, userId } = request as { postId: number; userId: number };
      return fetch(`https://jsonplaceholder.typicode.com/posts?id=${this.postId()}&userId=${this.userId()}`)
        .then((res) => res.json() as Promise<any[]>);
    },
  });

updateResource() {
    this.myResource.value.update((value) => {
      if (!value) return undefined;

      return { ...value, title: "Angular 19 is awsome!" };
    });
  }

  refreshResource() {
    this.myResource.reload();
  }

  changePostId() {
    this.postId.set(Math.ceil(Math.random() * 10));
  }

  changePostIdAndUserId() {
    this.postId.set(Math.ceil(Math.random() * 10));
    this.userId.set(Math.ceil(Math.random() * 10));

  }

}
