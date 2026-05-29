import {Sum} from '../services/library.services.mjs';
const calculateSum = (req, res) =>{
  const { num1, num2 } = req.body;
  const result = Sum(num1, num2);
  res.json({ result });
}
export { calculateSum };