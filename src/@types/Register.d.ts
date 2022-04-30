import User from "./User";

export default interface Register {
  id: number;
  timeRegistered: Date;
  type: "in" | "out";
  user: User;
}
