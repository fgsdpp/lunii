import { Router } from 'express';
import IndexController from '@/controllers/urrl.controller';
import { IRoute } from '@/interfaces/route';

class IndexRoute implements IRoute {
  public path = '/api';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/shorturl/analytics`, this.indexController.getAnalytics);
    this.router.get(`${this.path}/shorturl/:hash`, this.indexController.getURRL);
    this.router.post(`${this.path}/shorturl`, this.indexController.createHash);
  }
}

export default IndexRoute;
