import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

export const zodPostSchema = z.object({
  caption: z.string({ message: "Caption is required!" }).min(1),
  image: z.any().refine(
    (files) => {
      console.log(typeof files);
      if (typeof files === "string") {
        console.log("inside 1");
        return false;
      }

      console.log(
        "inside ---- ",
        files,
        ACCEPTED_IMAGE_TYPES.includes(files[0]?.type)
      );

      return ACCEPTED_IMAGE_TYPES.includes(files[0]?.type);
    },
    {
      message:
        "Invalid image type. Only .jpg,.jpeg,.png, and.webp files are accepted!",
    }
  ),
});
