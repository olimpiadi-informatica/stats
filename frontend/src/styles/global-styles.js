import { injectGlobal } from "styled-components";

/* eslint no-unused-expressions: 0 */
injectGlobal`
html,
body {
  height: 100%;
  width: 100%;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
}

a {
  color : black !important;
}

.logo-header {
  color: none;
  text-decoration: none;
}
.logo-header:hover { text-decoration: none;}

html {
  font-size: 1rem;
}

.card {
  padding: 20px;
  border : none;
}

@include media-breakpoint-up(sm) {
  html {
    font-size: 1.2rem;
  }
}

@include media-breakpoint-up(md) {
  html {
    font-size: 1.4rem;
  }
}

@include media-breakpoint-up(lg) {
  html {
    font-size: 1.6rem;
  }
}

.gold > ion-icon {
  color: #ffdb19 !important;
}
.silver > ion-icon {
  color: #C0C0C0;
}
.bronze > ion-icon {
  color: #CD7F32;
}

@media (min-width: 576px) {
  .card-columns {
    column-count: 1;
  }
}

@media (min-width: 768px) {
  .card-columns {
    column-count: 2;
  }
}

@media (min-width: 992px) {
  .card-columns {
    column-count: 2;
  }
}

@media (min-width: 1200px) {
  .card-columns {
    column-count: 3;
  }
}

}

`;
