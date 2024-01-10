import { LinearProgress, Typography } from "@mui/material";

const Loading = () =>{
    return(
        <div className="flex mx-auto px-10 sm:px-40" style={{ margin: 40, fontSize: 14 }}>
            <Typography style={{ marginTop: 20 }} variant="h2">Page Loading ... </Typography>
            <div style={{ marginTop: 20 }}>
                <LinearProgress
                    color="info"
                    // fourColor
                    variant="indeterminate"
                />
            </div>
        </div>
    )
}

export default Loading;




