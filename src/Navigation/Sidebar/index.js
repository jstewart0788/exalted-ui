import React from "react";
import _ from "lodash";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Slider from "@material-ui/core/Slider";
import Collapse from "@material-ui/core/Collapse";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MonetizationOnTwoTone from "@material-ui/icons/MonetizationOnTwoTone";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { NAV_ITEMS } from "../../shared/constants";
import useStyles from "./styles";

export default function Sidebar({ highestCost, allEffects, allElements }) {
  const [cost, setCost] = React.useState([0, 10]);
  const [costOpen, toggleCost] = React.useState(false);
  const [elementsOpen, toggleElements] = React.useState(false);
  const [effectsOpen, toggleEffects] = React.useState(false);
  const [minsOpen, toggleMins] = React.useState(false);
  const [elements, setElementState] = React.useState([]);
  const [effects, setEffectState] = React.useState([]);

  const handleEffectChange = name => event => {
    if (event.target.checked) setEffectState([...effects, name]);
    else setEffectState(_.xor([...effects], [name]));
  };

  const handleElementChange = name => event => {
    if (event.target.checked) setElementState([...elements, name]);
    else setElementState(_.xor([...elements], [name]));
  };

  const classes = useStyles();
  const handleSetCostState = (event, newValue) => {
    setCost(newValue);
  };

  function handleClick(name) {
    switch (name) {
      case NAV_ITEMS.COSTS:
        toggleCost(!costOpen);
        break;
      case NAV_ITEMS.EFFECTS:
        toggleEffects(!effectsOpen);
        break;
      case NAV_ITEMS.ELEMENTS:
        toggleElements(!elementsOpen);
        break;
      case NAV_ITEMS.MINIMUMS:
        toggleMins(!minsOpen);
        break;
      default:
        break;
    }
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
      <List>
        <ListItem button onClick={handleClick.bind(null, NAV_ITEMS.COSTS)}>
          <ListItemIcon>
            <MonetizationOnTwoTone />
          </ListItemIcon>
          <ListItemText primary={"Costs"} />
          {costOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={costOpen} timeout="auto" unmountOnExit>
          <ListItem button className={classes.nestedLarge}>
            <Slider
              classes={{
                root: classes.sliderRoot
              }}
              value={cost}
              onChange={handleSetCostState}
              valueLabelDisplay="on"
              aria-labelledby="range-slider"
              getAriaValueText={value => `${value} motes`}
              step={1}
              marks
              min={0}
              max={highestCost}
            />
          </ListItem>
        </Collapse>

        <ListItem button onClick={handleClick.bind(null, NAV_ITEMS.ELEMENTS)}>
          <ListItemIcon>
            <MonetizationOnTwoTone />
          </ListItemIcon>
          <ListItemText primary={"Elements"} />
          {elementsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={elementsOpen} timeout="auto" unmountOnExit>
          <ListItem button className={classes.nested}>
            <FormControl component="fieldset">
              <FormGroup>
                {allElements.map(element => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={elements.includes(element)}
                        onChange={handleElementChange(element)}
                        value={element}
                      />
                    }
                    label={element}
                    key={`filter-${element}`}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </ListItem>
        </Collapse>

        <ListItem button onClick={handleClick.bind(null, NAV_ITEMS.EFFECTS)}>
          <ListItemIcon>
            <MonetizationOnTwoTone />
          </ListItemIcon>
          <ListItemText primary={"Effects"} />
          {effectsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={effectsOpen} timeout="auto" unmountOnExit>
          <ListItem button className={classes.nested}>
            <FormControl component="fieldset">
              <FormGroup>
                {allEffects.map(effect => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={effects.includes(effect)}
                        onChange={handleEffectChange(effect)}
                        value={effect}
                      />
                    }
                    label={effect}
                    key={`filter-${effect}`}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </ListItem>
        </Collapse>
        <ListItem button onClick={handleClick.bind(null, NAV_ITEMS.MINIMUMS)}>
          <ListItemIcon>
            <MonetizationOnTwoTone />
          </ListItemIcon>
          <ListItemText primary={"Minimums"} />
          {minsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={minsOpen} timeout="auto" unmountOnExit>
          <ListItem button className={classes.nested}>
            TODO
          </ListItem>
        </Collapse>
      </List>
    </Drawer>
  );
}
