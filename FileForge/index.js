import App from './js/app.js';

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