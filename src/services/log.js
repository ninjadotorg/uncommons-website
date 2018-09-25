export function InfoLog(...argu) {
  // eslint-disable-next-line
  console.log(argu);
}

export function ErrorLog(...argu) {
  // eslint-disable-next-line
  console.error(argu);
}

const Log = {
  Error: ErrorLog,
  Info: InfoLog,
};

export default Log;
