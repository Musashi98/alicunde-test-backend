module.exports = (func: Function) => {
  return (req: Request, res: Response, next: Function) => {
    func(req, res, next).catch((e: Error) => {
      console.log(e.message);
      next({ status: 500, message: e.message });
    });
  };
};
