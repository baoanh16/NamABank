<?xml version='1.0' encoding='utf-8'?>
<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'
    xmlns:msxsl='urn:schemas-microsoft-com:xslt' exclude-result-prefixes='msxsl'>
    <xsl:output method='html' indent='yes' />
    <xsl:template match='/'>
        <section class="nama-bieumau-1">
            <div class="container">
                <div class="main-title">
                    <h2>
                        <xsl:value-of disable-output-escaping='yes' select='/ZoneList/ZoneTitle'></xsl:value-of>
                    </h2>
                </div>
                <div class="main-wrapper">
                    <div class="table">
                        <xsl:apply-templates select='/ZoneList/Zone' mode="Zone1"></xsl:apply-templates>
                    </div>
                </div>
            </div>
        </section>
    </xsl:template>

    <xsl:template match='Zone' mode="Zone1">
        <xsl:if test="IsActive='true'">
            <table>
                <thead>
                    <tr>
                        <th>
                            <xsl:value-of disable-output-escaping='yes' select='/ZoneList/OrdinalNumberText'>
                            </xsl:value-of>
                        </th>
                        <th>
                            <xsl:value-of disable-output-escaping='yes' select='/ZoneList/DocumentTitleText'>
                            </xsl:value-of>
                        </th>
                        <th>
                            <xsl:value-of disable-output-escaping='yes' select='/ZoneList/DownloadText'></xsl:value-of>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <xsl:apply-templates select='Zone' mode="Zone2"></xsl:apply-templates>
                </tbody>
            </table>
        </xsl:if>
    </xsl:template>

    <xsl:template match='Zone' mode="Zone2">
        <tr>
            <td colspan="3">
                <xsl:value-of disable-output-escaping='yes' select='Title'></xsl:value-of>
            </td>
        </tr>
        <xsl:apply-templates select='News'></xsl:apply-templates>
    </xsl:template>

    <xsl:template match='News'>
        <tr>
            <td>
                <xsl:value-of disable-output-escaping='yes' select='position()'></xsl:value-of>
            </td>
            <td>
                <xsl:value-of disable-output-escaping='yes' select='Title'></xsl:value-of>
                <xsl:value-of select='EditLink' disable-output-escaping='yes'></xsl:value-of>
            </td>
            <td>
                <a download="">
                    <xsl:attribute name='href'>
                        <xsl:value-of select='FileUrl'></xsl:value-of>
                    </xsl:attribute>
                    <xsl:attribute name='title'>
                        <xsl:value-of select='Title'></xsl:value-of>
                    </xsl:attribute>
                    <em class="fas fa-download"></em>
                </a>
            </td>
        </tr>
    </xsl:template>
</xsl:stylesheet>