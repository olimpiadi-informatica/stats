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
  font-family: sans-serif;
}

.gold > ion-icon {
    color: #FFD700;
}
.silver > ion-icon {
    color: #C0C0C0;
}
.bronze > ion-icon {
    color: #CD7F32;
}
`;
