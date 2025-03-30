import { Button } from "antd";
import { useState } from "react";

const ClipboardCopyBtn = ({ copyText }:{ copyText:string }) => {
    const [isCopied, setIsCopied] = useState(false);

    // This is the function we wrote earlier
    async function copyTextToClipboard(text:string) {
        if ("clipboard" in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand("copy", true, text);
        }
    }

    // onClick handler function for the copy button
    const handleCopyClick = () => {
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard(copyText)
            .then(() => {
                // If successful, update the isCopied state value
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <Button onClick={handleCopyClick} type="primary" size="small">
                <span>{isCopied ? "Copied!" : "Copy"}</span>
            </Button>
        </div>
    );
}

export default ClipboardCopyBtn;
