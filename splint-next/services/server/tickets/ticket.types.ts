export enum EscalationLevel {
  AUTOMATED = "automated",
  MENTOR_LEVEL = "mentor-level",
}
export enum TicketStatus {
  PENDING = "pending",
  ONGOING = "ongoing",
  COMPLETED = "completed",
  URGENT = "urgent",
}
export interface ITicket {
  query: string;
  chatHistory: string;
  escalationLevel: EscalationLevel;
  status: TicketStatus;
}
