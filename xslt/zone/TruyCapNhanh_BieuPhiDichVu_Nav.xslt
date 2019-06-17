<?xml version='1.0' encoding='utf-8'?>
<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'
    xmlns:msxsl='urn:schemas-microsoft-com:xslt' exclude-result-prefixes='msxsl'>
    <xsl:output method='html' indent='yes' />
    <xsl:template match='/'>
        <xsl:apply-templates select='/ZoneList/Zone' mode="Zone1"></xsl:apply-templates>
    </xsl:template>

    <xsl:template match='Zone' mode="Zone1">
        <xsl:if test="IsActive='true'">
            <xsl:apply-templates select='Zone' mode="Zone2"></xsl:apply-templates>
        </xsl:if>
    </xsl:template>

    <xsl:template match='Zone' mode="Zone2">
        <xsl:if test="IsActive='true'">
            <xsl:apply-templates select='Zone' mode="Zone3"></xsl:apply-templates>
        </xsl:if>
    </xsl:template>

    <xsl:template match='Zone' mode="Zone3">
        <xsl:if test="position() = 2">
            <div class="main-title">
                <h2>
                    <xsl:value-of disable-output-escaping='yes' select='/ZoneList/BieuPhiDichVuText'></xsl:value-of>
                </h2>
            </div>
            <div class="main-nav ajaxZoneResponse">
                <h5>
                    <xsl:value-of disable-output-escaping='yes' select='/ZoneList/ForText'></xsl:value-of>
                    <xsl:text>: </xsl:text>
                </h5>
                <div class="select">
                    <select id="bieuPhiDichVuSelect">
                        <option value="">
                            <xsl:if test="IsActive='true'">
                                <xsl:attribute name='selected'>
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:attribute name='value'>
                                <xsl:value-of disable-output-escaping='yes' select='Url'></xsl:value-of>
                            </xsl:attribute>
                            <xsl:value-of disable-output-escaping='yes' select='/ZoneList/AllText'></xsl:value-of>
                        </option>
                        <xsl:apply-templates select='Zone' mode="Zone4"></xsl:apply-templates>
                    </select>
                </div>
                <div class="frm-submit" id="bieuPhiDichVuButton">
                    <button type="button">
                        <xsl:value-of disable-output-escaping='yes' select='/ZoneList/ViewText'></xsl:value-of>
                    </button>
                </div>
            </div>
        </xsl:if>
    </xsl:template>

    <xsl:template match='Zone' mode="Zone4">
        <option>
            <xsl:if test="IsActive='true'">
                <xsl:attribute name='selected'>
                </xsl:attribute>
            </xsl:if>
            <xsl:attribute name='value'>
                <xsl:value-of disable-output-escaping='yes' select='Url'></xsl:value-of>
            </xsl:attribute>
            <xsl:value-of disable-output-escaping='yes' select='Title'></xsl:value-of>
        </option>
    </xsl:template>
</xsl:stylesheet>