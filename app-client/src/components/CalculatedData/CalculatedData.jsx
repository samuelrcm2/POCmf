//react
import React from "react";
import { connect } from "react-redux";


//Third Part Libraries
import { isNilOrEmpty } from "ramda-adjunct";
import { nameTranslations, unitTranslation } from "../Generic/Util";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import "./CalculatedData.css";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const CalculatedData = (props) => {
  const { motorChainCalculatedData, headMotorCalculatedData } = props;

  const generateCalculosTable = (calc) => {
    if(isNilOrEmpty(calc)) return null;
    return(
    <div>
      <Table size="small" className="Data-View-Table" aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Property</StyledTableCell>
            <StyledTableCell align="right">Value</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {calc.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {nameTranslations[row.name]}
              </StyledTableCell>
              <StyledTableCell align="right">{parseFloat(
                  row.value.toFixed(3)) + ' '  + unitTranslation[row.name]}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      </div>)
      }

  if (
    isNilOrEmpty(motorChainCalculatedData) &&
    isNilOrEmpty(headMotorCalculatedData)
  )
    return null;
  return (
    <div className="Calculos-Table">
    <h3>Motor Chain</h3>
      {generateCalculosTable(motorChainCalculatedData)}
    <h3>Motor Head</h3>
      {generateCalculosTable(headMotorCalculatedData)}
    </div>  
    );
};
const mapStateToProps = (state) => ({
  motorChain: state.motorChain.motorChain,
  materials: state.motorChain.allMaterials,
  calculationType: state.motorChain.calculationType,
  motorChainCalculatedData: state.motorChain.calculatedData,
  headMotorCalculatedData: state.headMotor.calculatedData,
  buttonIsDisabled: state.motorChain.buttonIsDisabled,
});

export default connect(mapStateToProps)(CalculatedData);
