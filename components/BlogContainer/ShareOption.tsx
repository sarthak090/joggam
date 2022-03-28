import Img from "next/image";
type Props = {
  shareOption?: any;
};
const ShareOption: React.FC<Props> = ({ shareOption }) => {
  return (
    <div className="share   md:flex     w-25 flex gap-2">
      {shareOption &&
        shareOption.map((sh: any, i: number) => (
          <div
            key={i}
            className="w-16 h-16 flex text-xs  justify-center flex-wrap items-center rounded-full "
          >
            <a href={sh.href} id={sh.css} rel="noreferrer" target="_blank">
              {sh.src ? (
                <Img
                  src={sh.src}
                  width={28}
                  height={28}
                  className="w-8 h-8 object-contain"
                  alt="social share"
                />
              ) : (
                sh.label
              )}
            </a>
          </div>
        ))}
    </div>
  );
};
export default ShareOption;
