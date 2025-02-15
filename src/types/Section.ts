import ITask from "./Task";

export default interface ISection {
    id: number;
    title: string;
    tasks: ITask[];
}
