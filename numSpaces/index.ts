const numberWithSpaces = (x: number, fullValue?: boolean) => {
  try {
    if (fullValue) {
      let parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return parts.join(".");
    } else {
      const secondNumber = x.toString()[2] === "0" ? "" : x.toString()[2];
      const needDot = secondNumber ? "." : "";
      const thirdNumber = x.toString()[3] === "0" ? "" : x.toString()[3];
      const needDot3 = thirdNumber ? "." : "";
      if (x.toString().length > 12) {
        return "999B+";
      } else if (x.toString().length === 12) {
        return (
          x.toString()[0] +
          x.toString()[1] +
          x.toString()[2] +
          needDot3 +
          thirdNumber +
          "B"
        );
      } else if (x.toString().length === 11) {
        if (thirdNumber) {
          return (
            x.toString()[0] +
            x.toString()[1] +
            "." +
            x.toString()[2] +
            x.toString()[3] +
            "B"
          );
        } else {
          return (
            x.toString()[0] + x.toString()[1] + needDot + secondNumber + "B"
          );
        }
      } else if (x.toString().length === 10) {
        return x.toString()[0] + "." + x.toString()[1] + secondNumber + "B";
      } else if (x.toString().length === 9) {
        return (
          x.toString()[0] +
          x.toString()[1] +
          x.toString()[2] +
          needDot3 +
          thirdNumber +
          "M"
        );
      } else if (x.toString().length === 8) {
        if (thirdNumber) {
          return (
            x.toString()[0] +
            x.toString()[1] +
            "." +
            x.toString()[2] +
            x.toString()[3] +
            "M"
          );
        } else {
          return (
            x.toString()[0] + x.toString()[1] + needDot + secondNumber + "M"
          );
        }
      } else if (x.toString().length === 7) {
        return x.toString()[0] + "." + x.toString()[1] + secondNumber + "M";
      } else {
        let parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
      }
    }
  } catch (e) {
    console.log(`[numberWithSpaces] error with ${e}`);
  }
};

//  ####-####-####-####-####-####-####-####-####-####

const newFunc = (x: number, fullValue?: boolean): string => {
  const formatNumber = (num: number) => {
    const formattedNum = num
      .toLocaleString("en-US")
      .replace(/,/g, ".")
      .slice(0, 5);

    if (formattedNum.endsWith("00")) {
      if (formattedNum.endsWith(".00")) {
        return formattedNum.slice(0, -3);
      }
      return formattedNum.slice(0, -2);
    }

    if (formattedNum.endsWith("0")) {
      if (formattedNum.endsWith(".0")) {
        return formattedNum.slice(0, -2);
      }
      return formattedNum.slice(0, -1);
    }

    if (formattedNum.split(".")[1].length === 3) {
      return formattedNum.slice(0, -1);
    }

    return formattedNum;
  };

  const replaceWithPattern = (num: number) => {
    let parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
  };

  try {
    if (fullValue) {
      return replaceWithPattern(x);
    }

    if (!fullValue) {
      if (x.toString().length > 12) {
        return "999B+";
      }

      if (x.toString().length < 13 && x.toString().length > 9) {
        return formatNumber(x) + "B";
      }

      if (x.toString().length < 10 && x.toString().length > 6) {
        return formatNumber(x) + "M";
      }

      return replaceWithPattern(x);
    }
  } catch (e) {
    console.log(`[numberWithSpaces] error with ${e}`);
  }

  return "";
};

(() => {
  const tests = [
    123, 10001, 153056, 5132.51321, 5130.01321, -1, -5561321313, 99999,
    12345678, 912321561321, 912301561321, 51231411.31313131, 0,
  ];

  tests.forEach((number, index) => {
    const old = numberWithSpaces(number, false);
    const old1 = numberWithSpaces(number, true);
    const newN = newFunc(number, false)
      ?.replace(/\xa0/g, " ")
      ?.replace(/\u202f/g, " ");
    const newN1 = newFunc(number, true)
      ?.replace(/\xa0/g, " ")
      ?.replace(/\u202f/g, " ");
    const status = old == newN && old1 == newN1;
    console.log(
      `#${index + 1}`,
      status ? "OK" : "FAILED",
      !status ? `${old} == ${newN} | ${old1} == ${newN1}` : ""
    );
  });
})();
