import { HttpError } from 'routing-controllers';

export class PhotoNotFoundError extends HttpError {
    constructor() {
        super(404, 'Photo not found!');
    }
}
