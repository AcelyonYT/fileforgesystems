import App from '../../src/js/app.js';
import serverless from 'serverless-http';

const app = new App();
app.init();

[
    'SIGINT', 'SIGTERM', 'SIGQUIT'
].forEach( signal =>
    process.on( signal, () => {
        app.controller.db.db.close();
        console.log("Database closed, exiting the app!")
        process.exit();
    } 
) );

export default app;
export const handler = serverless( app.app );