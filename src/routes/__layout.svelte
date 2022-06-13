<header class="p-3 bg-dark text-white">
	<div class="container">
		<div
			class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
		>
			<!-- <div>
        <a href="/" class=" pr-5 text-white text-decoration-none">
          Coddit
        </a>
        </div> -->
			<ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
				<li><a href="/" class="nav-link px-2 text-white">Coddit</a></li>
			</ul>

			<form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
				<input
					type="search"
					class="form-control form-control-dark text-white bg-dark"
					placeholder="Search..."
					aria-label="Search"
				/>
			</form>

			<div class="text-end">
				<a href="/login"><button type="button" class="btn btn-outline-light me-2">Login</button></a>
				<a href="/register"><button type="button" class="btn btn-warning">Sign-up</button></a>
			</div>
		</div>
	</div>
</header>

<div class="container">
	<slot />
	<p class="mt-5 mb-3 text-muted">©Coddit 2022–2023</p>
</div>
