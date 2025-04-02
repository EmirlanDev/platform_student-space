import Image from "next/image";
import ImagesOne from "../../assets/imagesOne.png";
import ImagesTwo from "../../assets/imagesTwo.png";
import ImagesThree from "../../assets/imagesThree.png";
import ImagesFour from "../../assets/imagesFour.png";
import ImagesFive from "../../assets/imagesFive.png";
import ImagesSix from "../../assets/imagesSix.png";

export default function Images() {
  return (
    <section className="md:my-[110px] my-[40px]">
      <Image
        className="mb-[16px] max-[600px]:mb-[10px] rounded-[12px] min-h-[150px] object-cover"
        src={ImagesOne}
        alt="images"
      />
      <div className="flex gap-[16px] max-[600px]:gap-[10px] max-[700px]:flex-col">
        <Image
          className="max-[700px]:max-h-[150px] object-cover rounded-[12px]"
          src={ImagesTwo}
          alt="images"
        />
        <div className="">
          <div className="flex gap-[16px] max-[600px]:gap-[10px] mb-[16px] max-[600px]:mb-[10px]">
            <Image className="rounded-[12px]" src={ImagesThree} alt="images" />
            <Image className="rounded-[12px]" src={ImagesFour} alt="images" />
          </div>
          <div className="flex gap-[16px] max-[600px]:gap-[10px]">
            <Image className="rounded-[12px]" src={ImagesFive} alt="images" />
            <Image className="rounded-[12px]" src={ImagesSix} alt="images" />
          </div>
        </div>
      </div>
    </section>
  );
}
