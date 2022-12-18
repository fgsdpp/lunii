import { uRRLService } from '@/services/urrl.service';
import { logger } from '@/utils/logger';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

// TODO: slice this long regexp
const uriRegexp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i;

class URRLController {
  public getURRL = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.debug(`Getting URRL for hash ${req.params.hash}`);
      const returnURRL = await uRRLService.getUrrlFromHash(req.params.hash);
      res.redirect(returnURRL.originalUrl);
    } catch (error) {
      next(error);
    }
  };

  public getAnalytics = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.debug(`Getting Analytics`);
      res.send(await uRRLService.getAnalytics());
    } catch (error) {
      next(error);
    }
  };

  public createHash = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.info(`Got URL: ${req.body.url}`);
      const urlSchema = Joi.object({
        url: Joi.string().regex(uriRegexp).required()
      });
      const {error} = urlSchema.validate(req.body);
      if (error) {
        logger.error(`Got URL validation error: ${error}`);
        res.send({'error': 'Invalid URL'});
        return;
      }
      const returnHash = await uRRLService.createURRL(req.body.url);
      if (!returnHash) {
        logger.error(`Got an empty hash`)
        res.send({'error': 'Invalid URL'});
        return;
      }
      logger.info(`Successfully created new URRL with hash ${returnHash.shortUrl}`);
      res.send({urrl: returnHash});
    } catch (error) {
      next(error);
    }
  };
}

export default URRLController;
