import {Controller, Get} from '@nestjs/common';

@Controller('')
export class WelcomeHtmlController {
  @Get()
  public welcome() {
    return `
<html>
<head>
<title>Welcome</title>
</head>
<body>
  <h1>
    Welcome to the tsmean REST-API!
  </h1>
  <p>
    The REST-API can perform basic crud operations, but also has login / logout functionality.
  </p>
  <!-- Would be cool if Nest could automatically generate API Docs, which could be displayed here... -->
</body>
</html>`;
  }
}
