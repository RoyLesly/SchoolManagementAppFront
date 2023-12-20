import { CircularProgress, LinearProgress } from "@mui/material";

const Loading = () =>{
    return(
        <div className="flex mx-auto px-10 sm:px-40" style={{ margin: 40, fontSize: 14 }}>
            <div style={{ marginTop: 20 }}>Admin Page Loading ... </div>
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