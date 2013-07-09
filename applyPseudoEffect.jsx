var gridderPseudoEffect = <Effect matchname="GRIDDERControl" name="$$$/AE/Preset/GRIDDERControl=GRIDDERControl">
    <Group name="$$$/AE/Preset/Grid_step=Grid step">
        <Slider name="$$$/AE/Preset/Columns=Columns" default="0" valid_min="-100" valid_max="100" slider_min="0" slider_max="100" precision="1"/>
        <Slider name="$$$/AE/Preset/Rows=Rows" default="0" valid_min="-100" valid_max="100" slider_min="0" slider_max="100" precision="1"/>
    </Group>
    <Group name="$$$/AE/Preset/Grid_Mode=Grid Mode">
        <Checkbox name="$$$/AE/Preset/OnlyColumns=Only Columns" default="true" CANNOT_TIME_VARY="true"/>
        <Checkbox name="$$$/AE/Preset/OnlyRows=Only Rows" default="false" CANNOT_TIME_VARY="true"/>
    </Group>
    <Group name="$$$/AE/Preset/Spacing=Spacing">
        <Slider name="$$$/AE/Preset/X=X" default="0" valid_min="-1000" valid_max="1000" slider_min="0" slider_max="100" precision="1" DISPLAY_PIXEL="true"/>
        <Slider name="$$$/AE/Preset/Y=Y" default="0" valid_min="-1000" valid_max="1000" slider_min="0" slider_max="100" precision="1" DISPLAY_PIXEL="true"/>
        <Checkbox name="$$$/AE/Preset/RectangelGrid=Rectangel Grid" default="true" CANNOT_TIME_VARY="true"/>
    </Group>
    <Group name="$$$/AE/Preset/Grid_Overlay_Controls=Grid Overlay Controls">
        <Color name="$$$/AE/Preset/OverlayColor=Overlay Color" default_red="0" default_green="255" default_blue="255"/>
        <Slider name="$$$/AE/Preset/Thickness=Thickness" default="1" valid_min="0" valid_max="100" slider_min="0" slider_max="20" precision="1"/>
    </Group>
</Effect>;

var activeComp = app.project.activeItem;


try{
    activeComp.layer(2).effect.addProperty("Gridder");
}
catch(err){
    a= File(Folder.desktop.fullName + "/test.txt");
    a.open("w");
    a.write(gridderPseudoEffect);
    a.close();
    }