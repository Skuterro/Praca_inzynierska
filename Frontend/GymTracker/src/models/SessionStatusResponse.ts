import { SessionStatusEnum } from "./enums/SessionStatusEnum";

export interface SessionStatusResponse {
	status: SessionStatusEnum;
	sessionId: number | null;
}
