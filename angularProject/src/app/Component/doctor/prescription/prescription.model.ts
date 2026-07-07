import { Role, UserModel } from "../../../user/user.model";
import { Test } from "../../laboratorist/test/test.model";
import { Medicine } from "../../pharmacist/medicine/medicine.model";

export class Prescription {
    id!: number;
    prescriptionDate!: Date;
    notes!: string;
    createdAt!: Date;
    updatedAt!: Date;

    doctor?: UserModel;
    patient?: UserModel;

    medicines: Medicine[] = [];
    TestEntityList: Test[] = [];

    // Backward-compatible aliases used by older templates/components.
    user?: UserModel;
    medicine: Medicine[] = [];
    test?: Test;

}

