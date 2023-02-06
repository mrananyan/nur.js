import { EventSubscriber, On } from 'event-dispatch';

import { Logger } from '../../lib/logger';
import { Users } from '../models/Users';
import { events } from './events';

const log = new Logger(__filename);

@EventSubscriber()
export class UserEventSubscriber {

    @On(events.user.created)
    public onUserCreate(user: Users): void {
        log.info('User ' + user.toString() + ' created!');
    }

}
