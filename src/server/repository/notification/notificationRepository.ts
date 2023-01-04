import Notification from "../../../entities/Notification";
import { serverRepository } from "../../ServerRepository";
import AbstractRepository from "../AbstractRepository";
import isAuthetificated from "../IsAtuthenticaded";
import RepositoryOutput from "../RepositoryBoundry";


class NotificationRepository extends AbstractRepository {
    @isAuthetificated()
    public async listNotification(): Promise<RepositoryOutput<Notification[]>> {
        try {
            return await serverRepository.get('/notifications');
        } catch (error) {
            this.errorHandle(error);
        }
    }

    public async deleteNotification(notificationId: string): Promise<RepositoryOutput<Boolean>> {
        try {
            return await serverRepository.delete(`/notifications/${notificationId}`);
        } catch (error) {
            this.errorHandle(error);
        }
    }
}

export const notificationRepository = new NotificationRepository();