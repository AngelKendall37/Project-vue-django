<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid ">
    <a class="navbar-brand" href="/">Vue + Django</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link" href="#">Proyectos</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/create" class="nav-link" href="#">Crear</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
<body>
  
</body>
<div class="container-fluid mt-3">
  <router-view/>
</div>
  
</template>

<style>
body{   
  background: #0f3443; 
  background: -moz-linear-gradient(left, #0f3443 0%, #34e69f 100%); 
  background: -webkit-linear-gradient(left, #0f3443 0%,#34e69f 100%); 
  background: linear-gradient(to right, #0f3443 0%,#34e69f 100%);  
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0f3443', endColorstr='#34e69f',GradientType=1 );
}
</style>
