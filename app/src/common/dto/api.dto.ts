export class responseObject {
    status: string;
    message: string;
}

export class deleteUser {
    emailId: string;
}

export class getUser {
    status: string;
    message: string;
    data?: object;
}