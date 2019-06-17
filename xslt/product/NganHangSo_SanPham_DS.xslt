<?xml version='1.0' encoding='utf-8'?>
<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'
    xmlns:msxsl='urn:schemas-microsoft-com:xslt' exclude-result-prefixes='msxsl'>
    <xsl:output method='html' indent='yes' />
    <xsl:template match='/'>
        <section class="nama-nganhangso-3">
            <div class="container">
                <div class="main-title">
                    <h2>
                        <xsl:value-of disable-output-escaping='yes' select='/ProductList/ZoneTitle'></xsl:value-of>
                    </h2>
                </div>
                <div class="list-item">
                    <div class="row">
                        <xsl:apply-templates select='/ProductList/Product'></xsl:apply-templates>
                    </div>
                </div>
            </div>
        </section>
    </xsl:template>

    <xsl:template match='Product'>

        <div class="col-lg-4 item">
            <a>
                <xsl:attribute name='href'>
                    <xsl:value-of select='Url'></xsl:value-of>
                </xsl:attribute>
                <xsl:attribute name='target'>
                    <xsl:value-of select='Target'></xsl:value-of>
                </xsl:attribute>
                <xsl:attribute name='title'>
                    <xsl:value-of select='Title'></xsl:value-of>
                </xsl:attribute>
                <figure>
                    <div class="icon">
                        <img class='lazyload blur-up'>
                        <xsl:attribute name='data-src'>
                            <xsl:value-of select='ThumbnailUrl'></xsl:value-of>
                        </xsl:attribute>
                        <xsl:attribute name='alt'>
                            <xsl:value-of select='Title'></xsl:value-of>
                        </xsl:attribute>
                        <xsl:attribute name='title'>
                            <xsl:value-of select='Title'></xsl:value-of>
                        </xsl:attribute>
                        </img>
                    </div>
                    <figcaption>
                        <h4>
                            <xsl:value-of disable-output-escaping='yes' select='Title'></xsl:value-of>
                        </h4>
                    </figcaption>
                </figure>
            </a>
            <xsl:value-of select='EditLink' disable-output-escaping='yes'></xsl:value-of>
        </div>
    </xsl:template>
</xsl:stylesheet>