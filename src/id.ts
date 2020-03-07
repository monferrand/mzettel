import * as crypto from "crypto";

export function generate_random_id(){
    return crypto.randomBytes(10).toString('hex');
}
