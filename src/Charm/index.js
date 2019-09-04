import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useStyles from "./styles";

const iconsPerMinimum = (name, times, icon) => {
  const icons = [];
  for (let i = 0; i < times; i++) {
    icons.push(<span key={`${name}Icon-${i}`}>{icon} </span>);
  }
  return icons;
};

const formatCosts = (name, value) => {
  switch (name.toLowerCase()) {
    case "static":
      return `${value}m`;
    case "perdie":
      return `${value}m per die`;
    case "initiative":
      return `${value}i`;
    case "willpower":
      return `${value}wp`;
    case "aura":
      return `Expend ${value}  Aura`;
    case "initiativeperdie":
      return `(+${value}i per die)`;
    case "aggrivated":
      return `${value}a`;
    default:
      console.log("~~Unacounted cost~~~", name);
      return `${value}`;
  }
};

function Charm({ charm, index }) {
  const classes = useStyles();

  // List of all minimums with essesnce at the begining
  const minimumKeys = Object.keys(charm.mins);
  minimumKeys.sort(function(x, y) {
    return x.toLowerCase() === "essence"
      ? -1
      : y.toLowerCase() === "essence"
      ? 1
      : 0;
  });

  const costKeys = Object.keys(charm.costs);
  costKeys.sort(function(x, y) {
    return x.toLowerCase() === "static"
      ? -1
      : y.toLowerCase() === "static"
      ? 1
      : 0;
  });
  costKeys.sort(function(x, y) {
    return x.toLowerCase() === "initiativeperdie"
      ? 1
      : y.toLowerCase() === "initiativeperdie"
      ? -1
      : 0;
  });

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${index}-content`}
        id={`panel${index}-header`}
      >
        <div>
          <Typography display="block" variant="h5" gutterBottom>
            {charm.name}
          </Typography>
          <Typography display="block" variant="overline">
            {minimumKeys.map(min => (
              <span
                className={classes.requirements}
                key={`${charm.name}-${min}`}
              >
                <span className={classes.requirementTitle}>
                  {min.toUpperCase()}
                  {": "}
                </span>
                <span
                  className={
                    min.toLowerCase() === "essence" ? classes.gold : classes.red
                  }
                >
                  {iconsPerMinimum(
                    min,
                    charm.mins[min],
                    <i className="fad fa-circle" />
                  )}
                </span>
              </span>
            ))}
          </Typography>

          <Typography display="block" variant="overline">
            <span className={classes.requirements}>
              <span className={classes.requirementTitle}>Cost:</span>
              {costKeys.map((cost, index, all) => (
                <span
                  className={classes.requirements}
                  key={`${charm.name}-${cost}`}
                >
                  {formatCosts(cost, charm.costs[cost])}
                  {index === all.length - 1 ||
                  costKeys[index + 1].toLowerCase() === "initiativeperdie"
                    ? ""
                    : ","}
                </span>
              ))}
            </span>
            <span className={classes.requirements}>
              <span className={classes.requirementTitle}>Duration: </span>
              {charm.duration}{" "}
            </span>
            <span className={classes.requirements}>
              <span className={classes.requirementTitle}>Type:</span>{" "}
              {charm.type}
            </span>
          </Typography>

          <Typography display="block" variant="overline">
            <span className={classes.requirements}>
              <span className={classes.requirementTitle}>Effects: </span>
              {charm.effects.map((effect, index, all) =>
                index === all.length - 1 ? `${effect}` : `${effect}, `
              )}
            </span>
          </Typography>

          <Typography display="block" variant="overline">
            <span className={classes.requirements}>
              <span className={classes.requirementTitle}>Elements:</span>{" "}
              {charm.elements}
            </span>
          </Typography>

          {charm.prerequisites.length > 0 && (
            <Typography display="block" variant="overline">
              <span className={classes.requirements}>
                <span className={classes.requirementTitle}>Prerequisites:</span>
                {charm.prerequisites.map((preReq, index, all) =>
                  index === all.length - 1 ? `${preReq}` : `${preReq}, `
                )}
              </span>
            </Typography>
          )}
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div>
          <Typography display="block" variant="overline">
            <span className={classes.requirementTitle}>Description:</span>
          </Typography>
          <Typography paragraph variant="body1">
            {charm.description}
          </Typography>

          <Typography paragraph variant="body1">
            {charm.descriptionWithAura}
          </Typography>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default Charm;
