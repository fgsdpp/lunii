import App from '@/app';
import IndexRoute from '@/routes/urrl.route';

const app = new App([new IndexRoute()]);

app.listen();
