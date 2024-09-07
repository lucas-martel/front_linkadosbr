import { useState } from "react";

/**
 * Hook `useAlertCopy`
 * esse hook é responsavel por copiar algum texto e setar um alerta que pode variar
 * @returns {alertVisible} @returns {HandleCopyLink}
 */

interface HandleCopy {
  textToCopy: string;
  /**
   * 1 second is equal 1000 ms
   * @type {number}
   */
  timeFromAlertVisible: number;
}

const useAlertCopy = () => {
  const [alertVisible, setAlertVisible] = useState(false);

  const onCopyLink = (hc: HandleCopy) => {
    navigator.clipboard
      .writeText(hc.textToCopy)
      .then(() => {
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, hc.timeFromAlertVisible);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    alertVisible,
    onCopyLink,
  };
};

export default useAlertCopy;
