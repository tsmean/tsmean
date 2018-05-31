import {Controller, Get} from '@nestjs/common';

@Controller('')
export class WelcomeHtmlController {
  @Get()
  public welcome() {
    return `
<html style="margin: 0; padding: 0;">
<head>
<title>Welcome</title>
<style>
body {
  margin: 0;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
  text-align: center;
}
</style>
</head>
<body>
  <h1>
    Welcome to the tsmean REST-API!
  </h1>
  <p>
    <b><a href="/api/swagger">To the API Docs.</a></b>
  </p>
  <p>Build-ID: BUILD_ID</p>
</body>
</html>`;
  }
}
