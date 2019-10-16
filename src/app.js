import {
  http
} from './http';
import {
  ui
} from './ui';
console.log('test 123')


// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts)

// Listen for Add post
document.querySelector('.post-submit').addEventListener('click', submitPost)

//Listen for Delete Post
document.querySelector('#posts').addEventListener('click', deletePost);

// Listen for Edit State
document.querySelector('#posts').addEventListener('click', editPost);

function getPosts() {
  http.get('http://localhost:3000/posts')
    .then((data) => {
      ui.showPosts(data)
    })
    .catch((err) => console.log(err))

}

// Submit Post
function submitPost() {
  const title = document.querySelector('#title').value
  const body = document.querySelector('#body').value

  const data = {
    title,
    body
  }
  http.post('http://localhost:3000/posts', data)
    .then((data) => {
      ui.showAlert('Post Added', 'alert alert-success');
      ui.clearFields();
      getPosts()
    })
    .catch(err => console.log(err))
}

// Delete Post

function deletePost(e) {
  e.preventDefault()

  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if (confirm('Are you sure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Post Deleted', 'alert alert-danger');
          getPosts()
        })
        .catch(err => console.log(err))
    }
  }

}

// Edit Post

function editPost (e) {
 
  if(e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const data = {
      id,
      title,
      body
    }
    ui.fillForm(data)
  }
  e.preventDefault();
}