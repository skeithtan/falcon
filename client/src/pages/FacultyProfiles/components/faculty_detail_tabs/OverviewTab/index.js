import Grid from "@material-ui/core/Grid";
import React from "react";
import { DegreeCard } from "../../cards/DegreeCard";
import { OverviewCard } from "../../cards/OverviewCard";
import { RecognitionsCard } from "../../cards/RecognitionsCard";
import { TeachingSubjectsCard } from "../../cards/TeachingSubjectsCard";
import { wrap } from "./wrapper";


const BaseOverviewTab = ({classes, faculty}) => (
    <div className={classes.cardsContainer}>
        <Grid
            container
            spacing={16}
            alignItems="stretch"
            direction="column"
            wrap="nowrap"
        >
            <Grid item>
                <OverviewCard faculty={faculty} />
            </Grid>
            <Grid item>
                <TeachingSubjectsCard faculty={faculty} />
            </Grid>
            <Grid item>
                <DegreeCard faculty={faculty} />
            </Grid>
            <Grid item>
                <RecognitionsCard faculty={faculty} />
            </Grid>
        </Grid>
    </div>
);

export const OverviewTab = wrap(BaseOverviewTab);
