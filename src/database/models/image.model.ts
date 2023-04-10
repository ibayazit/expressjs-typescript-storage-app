import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';
const SALT_WORK_FACTOR = 10;

export interface ImageInterface {
    file: string;
    secret: string;
    compareSecret: CallableFunction
}

const imageSchema = new Schema<ImageInterface>({
    file: { type: String, required: true },
    secret: { type: String, required: false }
});

imageSchema.pre('save', function (next) {
    const image = this;

    if (image.secret === null)
        next();

    bcryptjs.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err)
            return next(err);

        bcryptjs.hash(image.secret, salt, function (err, hash) {
            if (err)
                return next(err);

            image.secret = hash;

            next();
        });
    });
})

imageSchema.methods.compareSecret = async function (secret: string) {
    return await bcryptjs.compare(secret, this.secret);
};

export default model<ImageInterface>('Image', imageSchema);