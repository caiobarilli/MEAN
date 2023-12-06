import { Request, Response } from 'express';

class WebController {
  public view(req: Request, res: Response): void {
    res.render('upload-file', { title: 'Upload File' });
  }

  public async fileUpload(req: Request, res: Response): Promise<void> {
    res.send(req.file);
  }
}

export default new WebController();
