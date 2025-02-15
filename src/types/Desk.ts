import ISection from "./Section";

export default interface IDesk {
    id: number;
    title: string;
    sections: ISection[];
}
