import { useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import styles from '../styles/graficoSectorStyles'
import { makeStyles } from '@material-ui/core'
import ReactTooltip from 'react-tooltip'

const useStyles = makeStyles(styles)

const GraficoSector = ({ datosSector }) => {
  const classes = useStyles()

  const [selected, setSelected] = useState(undefined);
  const [hovered, setHovered] = useState(undefined);

  const data = datosSector.map(({title, ...entry}, i) => {
    if (hovered === i) {
      return {
        ...entry,
        tooltip: title,
        color: 'grey',
      };
    }
    return entry;
  });

  const makeTooltipContent = (entry) => {
    return `${entry.tooltip}: ${entry.value}`;
  }

  const lineWidth = 100;
  const margen = 6;

  return (
    <div data-tip="" data-for="chart">
      <PieChart
        className={classes.estiloGrafico}
        data={data}
        radius={PieChart.defaultProps ? PieChart.defaultProps.radius - margen : 0}
        lineWidth={lineWidth}
        ssegmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
        segmentsShift={(index) => (index === selected ? margen : 1)}
        animate
        label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
        labelPosition={100 - lineWidth / 2}
        labelStyle={{
          fill: '#fff',
          opacity: 0.75,
          pointerEvents: 'none',
        }}
        onClick={(_, index) => {
          setSelected(index === selected ? undefined : index);
        }}
        onMouseOver={(_, index) => {
          setHovered(index);
        }}
        onMouseOut={() => {
          setHovered(undefined);
        }}
      />
      <ReactTooltip
        id="chart"
        getContent={() =>
          hovered >= 0 ? makeTooltipContent(data[hovered]) : null
        }
      />
    </div>
    
  );
}

export default GraficoSector;