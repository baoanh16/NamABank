<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl">
    <xsl:output method="html" indent="yes" />
    <xsl:template match="/">
        <section class="nama-tinct-ct-1">
            <div class="container">
                <div class="row">
                    <div class="col-lg-9">
                        <div class="fullContent">
                            <div class="heading">
                                <h4>
                                    <xsl:value-of disable-output-escaping="yes" select="/NewsDetail/Title"></xsl:value-of>
                                    <xsl:value-of select="/NewsDetail/EditLink" disable-output-escaping="yes"></xsl:value-of>
                                </h4>
                                <time>
                                    <xsl:value-of disable-output-escaping="yes" select="/NewsDetail/CreatedDate"></xsl:value-of>
                                </time>
                            </div>
                            <div class="content">
                                <xsl:value-of disable-output-escaping="yes" select="/NewsDetail/FullContent"></xsl:value-of>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="otherNews">
                            <div class="otherNewsTitle">
                                <h3>
                                    <xsl:value-of disable-output-escaping="yes" select="/NewsDetail/OtherNewsText"></xsl:value-of>
                                </h3>
                            </div>
                            <div class="news-list">
                                <xsl:apply-templates select="/NewsDetail/NewsOther"></xsl:apply-templates>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </xsl:template>
    <xsl:template match="NewsOther">
        <a>
            <xsl:attribute name="href">
                <xsl:value-of select="Url"></xsl:value-of>
            </xsl:attribute>
            <xsl:attribute name="target">
                <xsl:value-of select="Target"></xsl:value-of>
            </xsl:attribute>
            <xsl:attribute name="title">
                <xsl:value-of select="Title"></xsl:value-of>
            </xsl:attribute>
            <figure>
                <div class="img">
                    <img class="lazyload blur-up">
                        <xsl:attribute name="data-src">
                            <xsl:text>/Data/Sites/1/media/tintuc_macdinh.jpg</xsl:text>
                        </xsl:attribute>
                        <xsl:if test="ImageUrl != ''">
                            <xsl:attribute name="data-src">
                                <xsl:value-of select="ImageUrl"></xsl:value-of>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:attribute name="alt">
                            <xsl:value-of select="Title"></xsl:value-of>
                        </xsl:attribute>
                        <xsl:attribute name="title">
                            <xsl:value-of select="Title"></xsl:value-of>
                        </xsl:attribute>
                    </img>
                </div>
                <figcaption>
                    <time>
                        <xsl:value-of disable-output-escaping="yes" select="CreatedDate"></xsl:value-of>
                    </time>
                    <h5>
                        <xsl:value-of disable-output-escaping="yes" select="Title"></xsl:value-of>
                    </h5>
                </figcaption>
            </figure>
        </a>
    </xsl:template>
</xsl:stylesheet>