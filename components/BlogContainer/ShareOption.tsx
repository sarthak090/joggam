import React from "react";
type Props = {
  shareOption?: any;
};
const ShareOption: React.FC<Props> = ({ shareOption }) => {
  return (
    <div className="share   md:flex     w-25 flex gap-2">
      {shareOption &&
        shareOption.map((sh: any) => (
          <div className="w-16 h-16 flex text-xs  justify-center flex-wrap items-center rounded-full ">
            <a href={sh.href} id={sh.css} target="_blank">
              {sh.src ? (
                <img src={sh.src} className="w-8 h-8 object-contain" />
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
